import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Heart, 
  UserPlus, 
  MessageCircle, 
  Share2, 
  Trophy,
  CheckCheck,
  Clock,
  Filter,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LabubuLoading from "@/components/LabubuLoading"

const NOTIFICATION_TYPES = {
  LIKE: 'like',
  FOLLOW: 'follow',
  COMMENT: 'comment',
  SHARE: 'share',
  ACHIEVEMENT: 'achievement',
  SYSTEM: 'system'
}

const mockNotifications = [
  {
    id: 1,
    type: NOTIFICATION_TYPES.LIKE,
    user: {
      username: "cosmic_collector",
      displayName: "Alex Chen",
      avatar: "https://github.com/shadcn.png"
    },
    item: {
      id: 5,
      title: "Ocean Breeze Labubu",
      image: "https://picsum.photos/100/100?random=5"
    },
    message: "liked your",
    timestamp: "2 minutes ago",
    isRead: false
  },
  {
    id: 2,
    type: NOTIFICATION_TYPES.FOLLOW,
    user: {
      username: "labubu_hunter",
      displayName: "Maria Santos",
      avatar: "https://github.com/shadcn.png"
    },
    message: "started following you",
    timestamp: "15 minutes ago",
    isRead: false
  },
  {
    id: 3,
    type: NOTIFICATION_TYPES.COMMENT,
    user: {
      username: "toy_enthusiast",
      displayName: "David Kim",
      avatar: "https://github.com/shadcn.png"
    },
    item: {
      id: 3,
      title: "Dark Knight Labubu",
      image: "https://picsum.photos/100/100?random=3"
    },
    message: "commented on your",
    comment: "This is absolutely stunning! Where did you find this rare piece?",
    timestamp: "1 hour ago",
    isRead: false
  },
  {
    id: 4,
    type: NOTIFICATION_TYPES.LIKE,
    user: {
      username: "rare_finds",
      displayName: "Sophie Wilson",
      avatar: "https://github.com/shadcn.png"
    },
    item: {
      id: 1,
      title: "Cosmic Labubu Adventure",
      image: "https://picsum.photos/100/100?random=1"
    },
    message: "liked your",
    timestamp: "2 hours ago",
    isRead: true
  },
  {
    id: 5,
    type: NOTIFICATION_TYPES.ACHIEVEMENT,
    message: "You've reached 100 likes! Keep sharing your amazing collection.",
    timestamp: "3 hours ago",
    isRead: true
  },
  {
    id: 6,
    type: NOTIFICATION_TYPES.SHARE,
    user: {
      username: "collector_pro",
      displayName: "Emma Taylor",
      avatar: "https://github.com/shadcn.png"
    },
    item: {
      id: 2,
      title: "Pink Dreams Labubu",
      image: "https://picsum.photos/100/100?random=2"
    },
    message: "shared your",
    timestamp: "4 hours ago",
    isRead: true
  },
  {
    id: 7,
    type: NOTIFICATION_TYPES.FOLLOW,
    user: {
      username: "vintage_vibes",
      displayName: "Chris Johnson",
      avatar: "https://github.com/shadcn.png"
    },
    message: "started following you",
    timestamp: "6 hours ago",
    isRead: true
  },
  {
    id: 8,
    type: NOTIFICATION_TYPES.SYSTEM,
    message: "Welcome to Labubu Collector's Vault! Start by uploading your first item.",
    timestamp: "1 day ago",
    isRead: true
  }
]

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getNotificationIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.LIKE:
        return <Heart className="w-5 h-5 text-red-500" />
      case NOTIFICATION_TYPES.FOLLOW:
        return <UserPlus className="w-5 h-5 text-blue-500" />
      case NOTIFICATION_TYPES.COMMENT:
        return <MessageCircle className="w-5 h-5 text-green-500" />
      case NOTIFICATION_TYPES.SHARE:
        return <Share2 className="w-5 h-5 text-purple-500" />
      case NOTIFICATION_TYPES.ACHIEVEMENT:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      default:
        return <div className="w-5 h-5 bg-gray-500 rounded-full" />
    }
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead
    if (filter === "likes") return notification.type === NOTIFICATION_TYPES.LIKE
    if (filter === "follows") return notification.type === NOTIFICATION_TYPES.FOLLOW
    if (filter === "comments") return notification.type === NOTIFICATION_TYPES.COMMENT
    return true
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LabubuLoading size="large" text="Loading notifications..." textColor="hsl(var(--muted-foreground))" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    All Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("unread")}>
                    Unread Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("likes")}>
                    Likes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("follows")}>
                    Follows
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("comments")}>
                    Comments
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} size="sm">
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="labubu-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-2xl mx-auto mb-4">
                  🔔
                </div>
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {filter === "all" 
                    ? "You're all caught up! Check back later for new activity."
                    : `No ${filter} notifications found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`labubu-card cursor-pointer transition-all duration-200 hover:shadow-md ${
                  !notification.isRead ? 'border-primary/50 bg-primary/5' : ''
                }`}
                onClick={() => {
                  markAsRead(notification.id)
                  if (notification.item) {
                    navigate(`/item/${notification.item.id}`)
                  } else if (notification.user && notification.type === NOTIFICATION_TYPES.FOLLOW) {
                    navigate(`/gallery/${notification.user.username}`)
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon or User Avatar */}
                    <div className="flex-shrink-0">
                      {notification.user ? (
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>
                            {notification.user.displayName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">
                            {notification.user && (
                              <span className="font-semibold">
                                {notification.user.displayName}
                              </span>
                            )}
                            {notification.user && " "}
                            {notification.message}
                            {notification.item && (
                              <span className="font-semibold"> {notification.item.title}</span>
                            )}
                          </p>
                          
                          {notification.comment && (
                            <p className="text-sm text-muted-foreground mt-1 italic">
                              "{notification.comment}"
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            {!notification.isRead && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Item thumbnail or actions */}
                        <div className="flex items-center gap-2 ml-4">
                          {notification.item && (
                            <img
                              src={notification.item.image}
                              alt={notification.item.title}
                              className="w-12 h-12 object-cover rounded-labubu"
                            />
                          )}
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="w-8 h-8 p-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    markAsRead(notification.id)
                                  }}
                                >
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                                className="text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 